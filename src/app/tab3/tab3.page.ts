import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileCacheService, CachedFile } from '../services/file-cache.service';
@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
    readonly stringToParse: string;
    text: string;
    error: string;
    editorOptions = { theme: 'vs-dark', language: 'javascript' };
    code = '';
    worker: Worker;
    runBinding: any;
    files: CachedFile[];

    constructor(private filecache: FileCacheService) {}

    ionViewDidEnter() {
        this.files = this.filecache.getAll();
    }

    ngOnInit() {
        fetch('assets/sandbox/script.js').then(async (res) => {
            this.code = await res.text();
        });

        this.worker = new Worker('assets/sandbox/sandbox.js');
        this.worker.onmessage = ((ev: MessageEvent) => {
            this.handleMessage(ev);
        });


        // Disable save shortcurt
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 's' && event.ctrlKey) {
                event.preventDefault();
            }
        });
    }

    runScript() {
        this.text = '';
        this.worker.postMessage({ script: this.code, camtData: this.files });
        setTimeout(async () => {
            this.worker.terminate();

            // Create new worker with no user code and data
            this.worker = new Worker('assets/sandbox/sandbox.js');
            this.worker.onmessage = ((ev: MessageEvent) => {
                this.handleMessage(ev);
            });

            // tslint:disable-next-line: no-console
            console.info('Worker terminated');
        }, 60000);
    }

    private handleMessage(ev: MessageEvent) {
        if (ev.data.textAppend) {
            this.text += ev.data.textAppend;
        } else {
            this.text = ev.data.text;
            this.error = ev.data.error;
        }
    }

    onInit(editor) {
        this.runBinding = editor.addCommand(monaco.KeyCode.F2, () => {
            this.runScript();
        });
    }

    ngOnDestroy() {
        if (this.runBinding) {
            this.runBinding.dispose();
        }
    }


    // Example content
    addExample() {
        const example = `<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.052.001.02" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:iso:std:iso:20022:tech:xsd:camt.052.001.02 camt.052.001.02.xsd">
    <BkToCstmrAcctRpt>
        <GrpHdr>
            <MsgId>camt52_GR</MsgId>
            <CreDtTm>2019-11-08T16:20:06.570Z</CreDtTm>
            <MsgPgntn>
                <PgNb>1</PgNb>
                <LastPgInd>true</LastPgInd>
            </MsgPgntn>
        </GrpHdr>
        <Rpt>
            <Id>camt052</Id>
            <ElctrncSeqNb>00000</ElctrncSeqNb>
            <CreDtTm>2019-11-08T16:20:06.571Z</CreDtTm>
            <Acct>
                <Id>
                    <IBAN>DE86999999999999999999</IBAN>
                </Id>
                <Ccy>EUR</Ccy>
                <Svcr>
                    <FinInstnId>
                        <BIC>TESTDE99999</BIC>
                        <Nm>Test</Nm>
                        <Othr>
                            <Id>12345678901234</Id>
                            <Issr>UmsStId</Issr>
                        </Othr>
                    </FinInstnId>
                </Svcr>
            </Acct>
            <Bal>
                <Tp>
                    <CdOrPrtry>
                        <Cd>PRCD</Cd>
                    </CdOrPrtry>
                </Tp>
                <Amt Ccy="EUR">0.00</Amt>
                <CdtDbtInd>CRDT</CdtDbtInd>
                <Dt>
                    <Dt>NaN-NaN-NaN</Dt>
                </Dt>
            </Bal>
            <Bal>
                <Tp>
                    <CdOrPrtry>
                        <Cd>CLBD</Cd>
                    </CdOrPrtry>
                </Tp>
                <Amt Ccy="EUR">NaN</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Dt>
                    <Dt>2019-11-08</Dt>
                </Dt>
            </Bal>
            <Ntry>
                <Amt Ccy="EUR">4.02</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>PDNG</Sts>
                <BookgDt>
                    <Dt>2019-11-08</Dt>
                </BookgDt>
                <AcctSvcrRef>NONREF</AcctSvcrRef>
                <NtryDtls>
                    <TxDtls>
                        <Refs>
                            <Prtry>
                                <Tp>UMSATZ</Tp>
                                <Ref>2019-11-08T16:20:06.571Z</Ref>
                            </Prtry>
                        </Refs>
                        <BkTxCd>
                            <Prtry>
                                <Cd>NTRF+091+0000+000</Cd>
                                <Issr>DK</Issr>
                            </Prtry>
                        </BkTxCd>
                        <RltdPties>
                            <DbtrAcct>
                                <Id>
                                    <IBAN>DE86999999999999999999</IBAN>
                                </Id>
                            </DbtrAcct>
                            <CdtrAcct>
                                <Id>
                                    <IBAN>HR9123912345670329373</IBAN>
                                </Id>
                            </CdtrAcct>
                        </RltdPties>
                        <RltdAgts>
                            <DbtrAgt>
                                <FinInstnId>
                                    <BIC>TESTDE99999</BIC>
                                </FinInstnId>
                            </DbtrAgt>
                            <CdtrAgt>
                                <FinInstnId>
                                    <BIC>TFBZHR2ZZZZ</BIC>
                                </FinInstnId>
                            </CdtrAgt>
                        </RltdAgts>
                        <RmtInf>
                            <Ustrd>COUNT        1</Ustrd>
                        </RmtInf>
                    </TxDtls>
                </NtryDtls>
                <AddtlNtryInf>TRANSFER</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">4.02</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>PDNG</Sts>
                <BookgDt>
                    <Dt>2019-11-08</Dt>
                </BookgDt>
                <AcctSvcrRef>NONREF</AcctSvcrRef>
                <NtryDtls>
                    <TxDtls>
                        <Refs>
                            <Prtry>
                                <Tp>UMSATZ</Tp>
                                <Ref>2019-11-08T16:20:06.571Z</Ref>
                            </Prtry>
                        </Refs>
                        <BkTxCd>
                            <Prtry>
                                <Cd>NTRF+091+0000+000</Cd>
                                <Issr>DK</Issr>
                            </Prtry>
                        </BkTxCd>
                        <RltdPties>
                            <DbtrAcct>
                                <Id>
                                    <IBAN>DE86999999999999999999</IBAN>
                                </Id>
                            </DbtrAcct>
                            <CdtrAcct>
                                <Id>
                                    <IBAN>HR9123912345670329373</IBAN>
                                </Id>
                            </CdtrAcct>
                        </RltdPties>
                        <RltdAgts>
                            <DbtrAgt>
                                <FinInstnId>
                                    <BIC>TESTDE99999</BIC>
                                </FinInstnId>
                            </DbtrAgt>
                            <CdtrAgt>
                                <FinInstnId>
                                    <BIC>TFBZHR2ZZZZ</BIC>
                                </FinInstnId>
                            </CdtrAgt>
                        </RltdAgts>
                        <RmtInf>
                            <Ustrd>COUNT        1</Ustrd>
                        </RmtInf>
                    </TxDtls>
                </NtryDtls>
                <AddtlNtryInf>TRANSFER</AddtlNtryInf>
            </Ntry>
            <Ntry>
                <Amt Ccy="EUR">4.02</Amt>
                <CdtDbtInd>DBIT</CdtDbtInd>
                <Sts>PDNG</Sts>
                <BookgDt>
                    <Dt>2019-11-08</Dt>
                </BookgDt>
                <AcctSvcrRef>NONREF</AcctSvcrRef>
                <NtryDtls>
                    <TxDtls>
                        <Refs>
                            <Prtry>
                                <Tp>UMSATZ</Tp>
                                <Ref>2019-11-08T16:20:06.571Z</Ref>
                            </Prtry>
                        </Refs>
                        <BkTxCd>
                            <Prtry>
                                <Cd>NTRF+091+0000+000</Cd>
                                <Issr>DK</Issr>
                            </Prtry>
                        </BkTxCd>
                        <RltdPties>
                            <DbtrAcct>
                                <Id>
                                    <IBAN>DE86999999999999999999</IBAN>
                                </Id>
                            </DbtrAcct>
                            <CdtrAcct>
                                <Id>
                                    <IBAN>HR9123912345670329373</IBAN>
                                </Id>
                            </CdtrAcct>
                        </RltdPties>
                        <RltdAgts>
                            <DbtrAgt>
                                <FinInstnId>
                                    <BIC>TESTDE99999</BIC>
                                </FinInstnId>
                            </DbtrAgt>
                            <CdtrAgt>
                                <FinInstnId>
                                    <BIC>TFBZHR2ZZZZ</BIC>
                                </FinInstnId>
                            </CdtrAgt>
                        </RltdAgts>
                        <RmtInf>
                            <Ustrd>COUNT        1</Ustrd>
                        </RmtInf>
                    </TxDtls>
                </NtryDtls>
                <AddtlNtryInf>TRANSFER</AddtlNtryInf>
            </Ntry>
        </Rpt>
    </BkToCstmrAcctRpt>
</Document>`;

        this.filecache.add(new CachedFile('test.xml', example));
    }
}
