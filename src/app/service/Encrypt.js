import { SHA512 } from "crypto-js";

function Encrypt(props) {
    const data = SHA512(props).toString();
    return data;
}

export default Encrypt;