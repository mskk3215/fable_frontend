import { TextEncoder, TextDecoder } from "util";
import "cross-fetch/polyfill";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
