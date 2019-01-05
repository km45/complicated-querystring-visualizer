import * as Formik from 'formik';
import * as React from 'react';

enum SubmitOperation {
    Undefined,
    Parse,
    Generate,
    Open
}

interface FormValues {
    operation: SubmitOperation;
    url: string;
}

interface Props { }

function render(props: Props & Formik.FormikProps<FormValues>): JSX.Element {
    return (
        <Formik.Form>
            <div className='ui form'>
                <div className='field'>
                    <Formik.Field
                        component='textarea'
                        name='url'
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
                    type='reset'
                >
                    <i className='trash icon' ></i>
                    clear
                </button>
            </div>
        </Formik.Form>
    );
};

function mapPropsToValues(props: Props): Props & FormValues {
    console.log(props);
    return {
        url: '',
        operation: SubmitOperation.Undefined
    };
}

function handleSubmit(values: FormValues): void {
    console.log('handleSubmit');
    console.log(values);
}

const NewMain = Formik.withFormik<Props, FormValues>({
    mapPropsToValues,
    handleSubmit
})(render);

export default NewMain;
