import * as Formik from 'formik';
import * as React from 'react';

interface FormValues {
    url: string;
}

interface Props { }

function render(_: Props & Formik.FormikProps<FormValues>): JSX.Element {
    return (
        <Formik.Form>
            <Formik.Field
                component='textarea'
                name='url'
            />
            <button type='submit'>Submit</button>
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
