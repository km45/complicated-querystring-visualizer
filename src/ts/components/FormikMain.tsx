import * as Formik from 'formik';
import * as React from 'react';
import FormikGrid from './FormikGrid';
import { ObjectTable } from '../logic/table-data';
import { ColumnsDefinition } from '../logic/query-binder';

interface Stringified {
    url: string;
}

interface Structured {
    basicTable: ObjectTable;
}

enum SubmitOperation {
    Undefined,
    Parse,
    Generate,
    Open
}

interface FormValues {
    operation: SubmitOperation;
    stringified: Stringified;
    structured: Structured;
}

interface NewMainProps { }

function render(props: NewMainProps & Formik.FormikProps<FormValues>): JSX.Element {
    return (
        <Formik.Form>
            <div className='ui form'>
                <div className='field'>
                    <Formik.Field
                        component='textarea'
                        name='stringified.url'
                    />
                </div>
                <button
                    className='ui primary button'
                    type='button'
                    onClick={async () => {
                        await props.setFieldValue('operation', SubmitOperation.Parse);
                        props.submitForm();
                    }}
                >
                    <i className='arrow alternate circle down icon' ></i>
                    parse
                </button>
                <button
                    className='ui secondary button'
                    type='button'
                    onClick={async () => {
                        await props.setFieldValue('operation', SubmitOperation.Generate);
                        props.submitForm();
                    }}
                >
                    <i className='arrow alternate circle up icon' ></i>
                    generate
                </button>
                <button
                    className='ui positive button'
                    type='button'
                    onClick={async () => {
                        await props.setFieldValue('operation', SubmitOperation.Open);
                        props.submitForm();
                    }}
                >
                    <i className='external icon' ></i>
                    open
                </button>
                <button
                    className='ui negative button'
                    type='button'
                    onClick={async () => {
                        await props.setFieldValue('stringified.url', '');
                        await props.setFieldValue('structured.basicTable', []);
                    }}
                >
                    <i className='trash icon' ></i>
                    clear
                </button>
                <Formik.FieldArray
                    name="structured.basicTable"
                    render={() => (
                        <FormikGrid
                            columns={ColumnsDefinition.basic}
                            data={props.values.structured.basicTable}
                        />
                    )}
                />
            </div>
        </Formik.Form>
    );
};

function mapPropsToValues(props: NewMainProps): NewMainProps & FormValues {
    console.log(props);
    return {
        stringified: {
            url: ''
        },
        operation: SubmitOperation.Undefined,
        structured: {
            basicTable: [
                {
                    key: 'key',
                    value: 'value'
                }
            ]
        }
    };
}

function handleSubmit(values: FormValues): void {
    console.log('handleSubmit');
    console.log(values);

    switch (values.operation) {
        case SubmitOperation.Open:
            openQuery(values.stringified.url);
            break;
    }
}

function openQuery(url: string): void {
    console.group('Open query');
    console.log(url);
    console.groupEnd();

    window.open(url, '_blank');
}

const NewMain = Formik.withFormik<NewMainProps, FormValues>({
    mapPropsToValues,
    handleSubmit
})(render);

interface Props { }

interface State { }

export default class FormikMain extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);
    }

    public render() {
        return (
            <NewMain />
        );
    }
}
