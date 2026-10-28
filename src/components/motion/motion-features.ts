// The framer-motion feature bundle, loaded after the page is interactive
// (LazyMotion in motion-provider.tsx). domMax, not domAnimation, because the
// tab and nav indicators glide with `layoutId`.
import { domMax } from "framer-motion";

export default domMax;
