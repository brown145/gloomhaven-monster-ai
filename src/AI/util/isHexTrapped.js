import { TOKEN_TYPES } from "types";

const isHexTrapped = (hex) => hex.token === TOKEN_TYPES.Trap;

export default isHexTrapped;
