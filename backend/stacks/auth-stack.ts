import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_cognito as Cognito } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";

interface authStackProps extends cdk.StackProps {}

export class AuthStack extends cdk.Stack {
  public readonly userPool: Cognito.UserPool;
  public readonly userPoolClient: Cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props?: authStackProps) {
    super(scope, id, props);
    this.userPool = this.createUserPool();
    this.userPoolClient = this.createWebClient();
    this.output();
  }

  createUserPool(props?: authStackProps) {
    const userPool = new Cognito.UserPool(this, "UserPool", {
      userPoolName: "UserPool",
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: false,
        requireUppercase: false,
        requireDigits: false,
        requireSymbols: false,
      },
      signInAliases: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        name: new Cognito.StringAttribute({
          minLen: 3,
          maxLen: 20,
        }),
      },
    });
    return userPool;
  }

  createWebClient() {
    const userPoolClient = new Cognito.UserPoolClient(
      this,
      "UserPoolClient",
      {
        userPool: this.userPool,
        authFlows: {
          userPassword: true,
          userSrp: true,
        },
      }
    );
    return userPoolClient;
  }

  output() {
    new cdk.CfnOutput(this, "UserPoolId", {
      value: this.userPool.userPoolId,
    });
    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: this.userPoolClient.userPoolClientId,
    });
  }
}
