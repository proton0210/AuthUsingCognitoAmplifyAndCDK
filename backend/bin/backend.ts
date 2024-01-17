#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AuthStack } from "../stacks/auth-stack";

const app = new cdk.App();
const authStack = new AuthStack(app, "AuthStack");
