// Wrapper for the jwt_decode result object.
// TODO: Expand for full functionality.
export class JwtToken {
    exp : number;
    cfor: string;
    role: string;

    constructor(_exp : number, _cfor : string, _role : string) {
        this.exp = _exp;
        this.cfor = _cfor;
        this.role = _role;
    }
}
