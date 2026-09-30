"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceUri, setVoiceUri] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      if (list.length && !voiceUri) setVoiceUri(list[0].voiceURI);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, [voiceUri]);

  const handleSpeak = () => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.voiceURI === voiceUri);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <>
<div className="mt-10 space-y-5">
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8}
              placeholder="Type or paste the text you want to hear read aloud..."
              className="w-full rounded-xl border border-surface-border bg-surface-card p-4 text-sm text-content-primary outline-none focus:border-brand-blue" />

            <div className="rounded-xl border border-surface-border bg-surface-card p-4 space-y-4">
              <div>
                <label htmlFor="voice" className="mb-2 block text-sm font-medium text-content-primary">Voice</label>
                <select id="voice" value={voiceUri} onChange={(e) => setVoiceUri(e.target.value)}
                  className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary">
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="rate" className="mb-2 block text-sm font-medium text-content-primary">Speed ({rate.toFixed(1)}x)</label>
                <input id="rate" type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full" />
              </div>
              <div>
                <label htmlFor="pitch" className="mb-2 block text-sm font-medium text-content-primary">Pitch ({pitch.toFixed(1)})</label>
                <input id="pitch" type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full" />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={handleSpeak} disabled={!text.trim() || isSpeaking}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue/90 disabled:opacity-70">
                <Play className="h-4 w-4" /> Speak
              </button>
              <button type="button" onClick={handleStop} disabled={!isSpeaking}
                className="flex items-center justify-center gap-2 rounded-xl border border-surface-border px-4 py-3 text-sm font-medium text-content-primary hover:border-brand-blue disabled:opacity-50">
                <Pause className="h-4 w-4" /> Stop
              </button>
            </div>

            <p className="text-xs text-content-muted text-center">
              Voices depend on your browser and operating system. Audio download is not supported by the Web Speech API — playback only.
            </p>
          </div>
    </>
  );
}

