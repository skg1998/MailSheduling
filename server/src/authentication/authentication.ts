import constants from "../config/constants";
import * as express from "express";
import * as jwt from 'jsonwebtoken';

/**
 * @param request
 * @param securityName
 * @param scopes
 */
export async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
    if (securityName === "auth") {
        const tokenString =
            request.body.token ||
            request.query.token ||
            request.headers["Authorization"] || 
            request.headers["authorization"];
        
        const token = tokenString?.split(" ")?.[1] ?? null;
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            }
            jwt.verify(token, constants.jwt.secret, function (err: any, decoded: any) {
                if (err) {
                    reject(err);
                } else {
                    // Check if JWT contains all required scopes
                    for (let scope of scopes) {
                        if (!decoded.scopes.includes(scope)) {
                            reject(new Error("You have not required scope."));
                        }
                    }
                    resolve(decoded);
                }
            });
        });
    }
}
