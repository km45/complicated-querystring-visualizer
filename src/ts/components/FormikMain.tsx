import * as Formik from 'formik';
import * as React from 'react';

interface FormValues {
    url: string;
}

interface Props { }

function render(_: Props & Formik.FormikProps<FormValues>): JSX.Element {
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
                    type='submit'
                >
                    <i className='arrow alternate circle down icon' ></i>
                    parse
                </button>
                <button
                    className='ui secondary button'
                    type='submit'
                >
                    <i className='arrow alternate circle up icon' ></i>
                    generate
                </button>
                <button
                    className='ui positive button'
                    type='submit'
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
        url: ''
    };
}

function handleSubmit(values: FormValues): void {
    console.log(values);
}

const NewMain = Formik.withFormik<Props, FormValues>({
    mapPropsToValues,
    handleSubmit
})(render);

export default NewMain;
