// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import vscode = require("vscode");
import {  RequestType } from "vscode-languageclient";
import { LanguageClientConsumer } from "../languageClientConsumer";
import { RenameProvider, WorkspaceEdit, TextDocument, CancellationToken, Position } from "vscode";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRenameSymbolRequestArguments {
    FileName?:string
    Line?:number
    Column?:number
    WantsTextChanges:boolean
    RenameTo:string
    ApplyTextChanges:boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRenameSymbolRequestResponse {
    text: string
}

export const RenameSymbolRequestType = new RequestType<IRenameSymbolRequestArguments, IRenameSymbolRequestResponse, void>("powerShell/renameSymbol");

export class RenameSymbolFeature extends LanguageClientConsumer implements RenameProvider {
    private command: vscode.Disposable;

    constructor() {
        super();
        this.command = vscode.commands.registerCommand("PowerShell.RenameSymbol", () => {
            throw new Error("Not implemented");

        });
    }
    public dispose() {
        this.command.dispose();
    }
    public async provideRenameEdits(document: TextDocument, position: Position, newName: string, _token: CancellationToken): Promise<WorkspaceEdit | undefined> {

        const req:IRenameSymbolRequestArguments = {
            FileName : document.fileName,
            Line: position.line,
            Column : position.character,
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
