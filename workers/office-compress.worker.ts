/// <reference lib="webworker" />
import * as Comlink from "comlink";
import { compressOfficeFile } from "@/lib/office-compress";

const api = { compressOfficeFile };

Comlink.expose(api);
