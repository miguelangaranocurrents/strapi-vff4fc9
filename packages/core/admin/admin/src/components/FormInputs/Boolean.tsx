import { forwardRef, memo } from 'react';

import { Toggle, useComposedRefs, Field, Flex, TextButton } from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { useFocusInputField } from '../../hooks/useFocusInputField';
import { useField } from '../Form';

import { InputProps } from './types';

const BooleanInput = forwardRef<HTMLInputElement, InputProps>(
  ({ name, required, label, hint, labelAction, disabled, ...props }, ref) => {
    const { formatMessage } = useIntl();
    const field = useField<boolean | null>(name);
    const fieldRef = useFocusInputField<HTMLInputElement>(name);

    const composedRefs = useComposedRefs(ref, fieldRef);

    const handleClear = () => {
      field.onChange(name, null);
    };

    /**
     * A boolean without a value is `undefined` (e.g. no default in the schema) on a new entry.
     * Only an explicit `true`/`false` should offer the clear action.
     */
    const hasValue = field.value !== null && field.value !== undefined;
    const showClearButton = !required && hasValue && !disabled;

    return (
      <Field.Root error={field.error} name={name} hint={hint} required={required} maxWidth="320px">
        <Flex justifyContent="space-between" alignItems="flex-end" gap={2}>
          <Field.Label action={labelAction}>{label}</Field.Label>
          {showClearButton && (
            <TextButton onClick={handleClear}>
              {formatMessage({ id: 'clearLabel', defaultMessage: 'Clear' })}
            </TextButton>
          )}
        </Flex>
        <Toggle
          ref={composedRefs}
          checked={field.value === null ? null : field.value || false}
          offLabel={formatMessage({
            id: 'app.components.ToggleCheckbox.off-label',
            defaultMessage: 'False',
          })}
          onLabel={formatMessage({
            id: 'app.components.ToggleCheckbox.on-label',
            defaultMessage: 'True',
          })}
          onChange={field.onChange}
          name={name}
          disabled={disabled}
          {...props}
        />
        <Field.Hint />
        <Field.Error />
      </Field.Root>
    );
  }
);

const MemoizedBooleanInput = memo(BooleanInput);

export { MemoizedBooleanInput as BooleanInput };
