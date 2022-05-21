import * as yup from "yup";
import { SchemaOf } from "yup";

export const isRequired = <TValues>(validationSchema: SchemaOf<TValues>, name: string): boolean =>
  yup
    .reach(validationSchema, name)
    .describe()
    .tests.some(({ name: testName }: { name: string }) => testName === "required");
