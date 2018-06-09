import * as React from "react";

export interface Props { }

interface State {
    text: string;
}

export class Form extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = {
            text: 'a=1&b=2&c=3&z=00__________01__________02__________03__________04__________05__________06__________07__________08__________09__________10__________11__________12__________13__________14__________15__________16__________17__________18__________19__________20__________21__________22__________23__________24__________25__________26__________27__________28__________29__________30__________31__________32__________33__________34__________35__________36__________37__________38__________39__________40__________41__________42__________43__________44__________45__________46__________47__________48__________49__________50__________51__________52__________53__________54__________55__________56__________57__________58__________59__________60__________61__________62__________63__________64__________65__________66__________67__________68__________69__________70__________71__________72__________73__________74__________75__________76__________77__________78__________79__________80__________81__________82__________83__________84__________85__________86__________87__________88__________89__________90__________91__________92__________93__________94__________95__________96__________97__________98__________99&coord1=x1,y1,z1&coord2=x2,y2,z2&coord3=x3,y3,z3&coord4=x4,y4,z4&coord5=x5,y5,z5&coord6=x6,y6,z6&coord7=x7,y7,z7&coord8=x8,y8,z8&coord9=x9,y9,z9&coord10=x10,y10,z10___00__________01__________02__________03__________04__________05__________06__________07__________08__________09__________10__________11__________12__________13__________14__________15__________16__________17__________18__________19__________20__________21__________22__________23__________24__________25__________26__________27__________28__________29__________30__________31__________32__________33__________34__________35__________36__________37__________38__________39__________40__________41__________42__________43__________44__________45__________46__________47__________48__________49__________50__________51__________52__________53__________54__________55__________56__________57__________58__________59__________60__________61__________62__________63__________64__________65__________66__________67__________68__________69__________70__________71__________72__________73__________74__________75__________76__________77__________78__________79__________80__________81__________82__________83__________84__________85__________86__________87__________88__________89__________90__________91__________92__________93__________94__________95__________96__________97__________98__________99'
        };
    }

    private onClickClear(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({
            text: ''
        });
    }

    private onTextAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            text: event.target.value
        });
    }

    public getText(): string {
        return this.state.text;
    }

    public setText(text: string): void {
        this.setState({
            text: text
        })
    }

    public render() {
        return (
            <form>
                <input type="text"
                    value={this.state.text}
                    onChange={(event) => this.onTextAreaChange(event)} />
                <input type="button"
                    value="Clear"
                    onClick={(event) => this.onClickClear(event)} />
            </form>
        );
    }
}