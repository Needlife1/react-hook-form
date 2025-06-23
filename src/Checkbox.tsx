import { Controller, type Control} from "react-hook-form";
import type { Iform } from './App';

interface Props{
    control: Control<Iform>
    // register: UseFormRegister<IForm>;
}

export const Checkbox: React.FC<Props> = ({ control }) => {
    console.log(control);
    
  return (
    <Controller
      control={control}
      name="isImportant"
      render={({ field }) => (
        <button type="button" onClick={() => field.onChange(!field.value)}>
          {field.value ? 'Важное сообшение' : 'Не важное сообщене'}
        </button>
      )}
    />
  );
};