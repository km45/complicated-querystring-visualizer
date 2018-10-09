import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as Component from '../components/Operator';
import {ColumnsDefinition} from '../logic/query-binder';
import {arrayTableToObjectTable, ObjectTable, objectTableToArrayTable} from '../logic/table-data';
import * as UrlBinder from '../logic/url-binder';
import {setText} from '../modules/StringifiedQuery';
import {setBasicTable, setCoordTable, setHostTable} from '../modules/StructuredQuery';
import {RootState} from '../store';

interface ObjectTables {
  basic: ObjectTable;
  coord: ObjectTable;
  host: ObjectTable;
}

function generateUrl(tables: ObjectTables): string {
  return UrlBinder.generateUrl({
    host:
        objectTableToArrayTable(UrlBinder.ColumnsDefinition.host, tables.host),
    query: {
      basic: objectTableToArrayTable(ColumnsDefinition.basic, tables.basic),
      coord: objectTableToArrayTable(ColumnsDefinition.coord, tables.coord)
    }
  });
}

function parseUrl(url: string): ObjectTables {
  const parsed = UrlBinder.parseUrl(url);

  return {
    basic: arrayTableToObjectTable(ColumnsDefinition.basic, parsed.query.basic),
    coord: arrayTableToObjectTable(ColumnsDefinition.coord, parsed.query.coord),
    host: arrayTableToObjectTable(UrlBinder.ColumnsDefinition.host, parsed.host)
  };
}

class Actions implements Component.Actions {
  private dispatch: Redux.Dispatch<any>;

  private basicObjectTable: ObjectTable;
  private coordObjectTable: ObjectTable;
  private hostObjectTable: ObjectTable;
  private stringifiedQuery: string;

  constructor(dispatch: Redux.Dispatch<any>, state: RootState) {
    this.dispatch = dispatch;

    this.basicObjectTable = state.structuredQuery.basicTable;
    this.coordObjectTable = state.structuredQuery.coordTable;
    this.hostObjectTable = state.structuredQuery.hostTable;
    this.stringifiedQuery = state.stringifiedQuery.text;
  }

  public clearFormText(): void {
    this.dispatch(setText(''));
  }

  public generateQuery(): void {
    const url = generateUrl({
      basic: this.basicObjectTable,
      coord: this.coordObjectTable,
      host: this.hostObjectTable
    });

    this.dispatch(setText(url));
  }

  public openQuery(): void {
    const url = this.stringifiedQuery;

    console.group('Open query');
    console.log(url);
    console.groupEnd();

    window.open(url, '_blank');
  }

  public parseQuery(): void {
    const url = this.stringifiedQuery;
    const tables = parseUrl(url);

    this.dispatch(setBasicTable(tables.basic));
    this.dispatch(setCoordTable(tables.coord));
    this.dispatch(setHostTable(tables.host));
  }

  public processOwnQuery(): void {
    const query = ((q: string): string => {
      if (!q) {
        return '';
      }

      return q.substring('?'.length);
    })(window.location.search);

    const tables = parseUrl(query);

    this.dispatch(setText(query));

    this.dispatch(setBasicTable(tables.basic));
    this.dispatch(setCoordTable(tables.coord));
    this.dispatch(setHostTable(tables.host));
  }
}

type StateProps = RootState;

interface DispatchProps {
  dispatch: Redux.Dispatch<any>;
}

function mapStateToProps(state: RootState): StateProps {
  return state;
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {dispatch};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps,
    _ /*ownProps*/: any): Component.Props {
  return {
    actions: new Actions(dispatchProps.dispatch, stateProps),
    values: {stringifiedQuery: stateProps.stringifiedQuery.text}
  };
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Component.default);
