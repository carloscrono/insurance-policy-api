import { Injectable } from '@nestjs/common';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import { cognitoConfig } from './cognito.config';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.UserPoolId,
      ClientId: cognitoConfig.ClientId,
    });
  }

  async signIn(username: string, password: string): Promise<any> {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (response) => {
          resolve(response);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired(userAttributes, requiredAttributes) {
          cognitoUser.completeNewPasswordChallenge(
            password,
            {},
            {
              onSuccess: (resp) => {
                resolve(resp);
              },
              onFailure: (e) => {
                reject(e);
              },
            },
          );
        },
      });
    });
  }
}
