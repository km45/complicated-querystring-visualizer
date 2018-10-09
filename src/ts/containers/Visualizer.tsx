import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as GridComponent from '../components/Grid';
import { ColumnsDefinition } from '../logic/query-binder';
import { ObjectTable } from '../logic/table-data';
import * as UrlBinder from '../logic/url-binder';
import { setBasicTable, setCoordTable, setHostTable } from '../modules/StructuredQuery';
import { RootState } from '../store';

class BasicGridActions implements GridComponent.Actions {
    private dispatch: Redux.Dispatch<any>;

    constructor(dispatch: Redux.Dispatch<any>) {
        this.dispatch = dispatch;
    }

    public setTable(table: ObjectTable): void {
        this.dispatch(setBasicTable(table));
    }
}

class CoordGridActions implements GridComponent.Actions {
    private dispatch: Redux.Dispatch<any>;

    constructor(dispatch: Redux.Dispatch<any>) {
        this.dispatch = dispatch;
    }

    public setTable(table: ObjectTable): void {
        this.dispatch(setCoordTable(table));
    }
}

class HostGridActions implements GridComponent.Actions {
    private dispatch: Redux.Dispatch<any>;

    constructor(dispatch: Redux.Dispatch<any>) {
        this.dispatch = dispatch;
    }

    public setTable(table: ObjectTable): void {
        this.dispatch(setHostTable(table));
    }
}

interface State { }

interface Props {
    children: {
        basicGrid: {
            actions: GridComponent.Actions;
            values: GridComponent.Values;
        },
        coordGrid: {
            actions: GridComponent.Actions;
            values: GridComponent.Values;
        },
        hostGrid: {
            actions: GridComponent.Actions;
            values: GridComponent.Values;
        }
    };
}

class Visualizer extends React.Component<Props, State> {
    public render() {
        return (
            <div>
                <GridComponent.default
                    actions={this.props.children.hostGrid.actions}
                    values={this.props.children.hostGrid.values} />
                <GridComponent.default
                    actions={this.props.children.basicGrid.actions}
                    values={this.props.children.basicGrid.values} />
                <GridComponent.default
                    actions={this.props.children.coordGrid.actions}
                    values={this.props.children.coordGrid.values} />
            </div>);
    }
}

interface StateProps {
    basicGridValues: GridComponent.Values;
    coordGridValues: GridComponent.Values;
    hostGridValues: GridComponent.Values;
}

interface DispatchProps {
    basicGridActions: GridComponent.Actions;
    coordGridActions: GridComponent.Actions;
    hostGridActions: GridComponent.Actions;
}

interface OwnProps { }

function mapStateToProps(state: RootState): StateProps {
    return {
        basicGridValues: {
            columns: ColumnsDefinition.basic,
            table: state.structuredQuery.basicTable,
            title: 'Basic'
        },
        coordGridValues: {
            columns: ColumnsDefinition.coord,
            table: state.structuredQuery.coordTable,
            title: 'Coord'
        },
        hostGridValues: {
            columns: UrlBinder.ColumnsDefinition.host,
            table: state.structuredQuery.hostTable,
            title: 'Host'
        }
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        basicGridActions: new BasicGridActions(dispatch),
        coordGridActions: new CoordGridActions(dispatch),
        hostGridActions: new HostGridActions(dispatch)
    };
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps,
    _/*ownProps*/: OwnProps): Props {
    return {
        children: {
            basicGrid: {
                actions: dispatchProps.basicGridActions,
                values: stateProps.basicGridValues
            },
            coordGrid: {
                actions: dispatchProps.coordGridActions,
                values: stateProps.coordGridValues
            },
            hostGrid: {
                actions: dispatchProps.hostGridActions,
                values: stateProps.hostGridValues
            }
        }
    };
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Visualizer);
