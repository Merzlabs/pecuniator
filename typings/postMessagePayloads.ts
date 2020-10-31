import { CachedFile } from 'src/app/services/file-cache.service';

// tslint:disable-next-line
export namespace PostMessageTypes {
    export interface CommandPayload {
        script: string;
        camtData: CachedFile[];
    }

    export interface ErrorPayload {
        error: string;
    }

    export interface ReturnPayload {
        text: string;
        textAppend: string;
    }
}

