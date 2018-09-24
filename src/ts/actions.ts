import * as TypescriptFsa from 'typescript-fsa';

const actionCreator = TypescriptFsa.actionCreatorFactory();

export const setFormText = actionCreator<string>('SET_FORM_TEXT');
