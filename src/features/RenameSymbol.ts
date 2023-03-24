// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {  RequestType } from "vscode-languageclient";
import { LanguageClientConsumer } from "../languageClientConsumer";
import { RenameProvider, WorkspaceEdit, TextDocument, CancellationToken, Position } from "vscode";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRenameSymbolRequestArguments {
    document:TextDocument
    position: Position,
    WantsTextChanges:boolean
    RenameTo:string
    ApplyTextChanges:boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRenameSymbolRequestResponse {
    text: string
}


export const RenameSymbolRequestType = new RequestType<IRenameSymbolRequestArguments, IRenameSymbolRequestResponse, void>("powerShell/RenameSymbol");

export class RenameSymbolFeature extends LanguageClientConsumer implements RenameProvider {
    dispose(): void {
        throw new Error("Method not implemented.");
    }

    public async provideRenameEdits(document: TextDocument, position: Position, newName: string, _token: CancellationToken): Promise<WorkspaceEdit | undefined> {

        const req:IRenameSymbolRequestArguments = {
            document : document,
            position : position,
            WantsTextChanges : true,
            RenameTo : newName,
            ApplyTextChanges : false
        };

        try {
            const result = await this.languageClient?.sendRequest(RenameSymbolRequestType, req);

            if (!result) {
                return undefined;
            }

            //const edit = new WorkspaceEdit();

        }catch (error) {
            return undefined;
        }
    }
}
