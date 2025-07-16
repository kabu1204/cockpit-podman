import React from 'react';

import { Button } from "@patternfly/react-core/dist/esm/components/Button";
import { FormGroup } from "@patternfly/react-core/dist/esm/components/Form";
import { TextInput } from "@patternfly/react-core/dist/esm/components/TextInput";
import { Grid } from "@patternfly/react-core/dist/esm/layouts/Grid";
import { TrashIcon } from '@patternfly/react-icons';
import { FormHelper } from "cockpit-components-form-helper.jsx";

import cockpit from 'cockpit';

const _ = cockpit.gettext;

export function validateExtraOption(option, key) {
    switch (key) {
    case "optionName":
        if (!option)
            return _("Option name must not be empty");
        if (!option.startsWith("--"))
            return _("Option name must start with --");
        break;
    case "optionValue":
        // Value can be empty for boolean options like --privileged
        break;
    default:
        console.error(`Unknown key "${key}"`); // not-covered: unreachable assertion
    }
}

export const ExtraOption = ({ idx, item, onChange, removeitem, additem, itemCount, validationFailed }) => {
    const onItemChange = (key, value) => {
        onChange(idx, key, value);
    };

    const validationFailedIdx = validationFailed?.[idx] || {};

    return (
        <Grid hasGutter key={ item.key }>
            <FormGroup className="pf-m-5-col-on-md" fieldId={'run-image-extra-option-name-' + idx}>
                <TextInput id={'run-image-extra-option-name-' + idx}
                           placeholder={_("--option-name")}
                           value={item.optionName || ''}
                           validated={validationFailedIdx.optionName ? "error" : "default"}
                           onChange={(_, value) => onItemChange('optionName', value)} />
                <FormHelper helperTextInvalid={validationFailedIdx.optionName} />
            </FormGroup>
            <FormGroup className="pf-m-5-col-on-md" fieldId={'run-image-extra-option-value-' + idx}>
                <TextInput id={'run-image-extra-option-value-' + idx}
                           placeholder={_("value (optional)")}
                           value={item.optionValue || ''}
                           validated={validationFailedIdx.optionValue ? "error" : "default"}
                           onChange={(_, value) => onItemChange('optionValue', value)} />
                <FormHelper helperTextInvalid={validationFailedIdx.optionValue} />
            </FormGroup>
            <FormGroup className="pf-m-action-group pf-m-2-col-on-md">
                { itemCount > 1 && <Button variant='plain'
                                           className="btn-close"
                                           aria-label={_("Remove item")}
                                           onClick={() => removeitem(idx)}>
                    <TrashIcon />
                </Button> }
                { idx === itemCount - 1 &&
                <Button variant="secondary"
                        className="btn-add"
                        onClick={additem}>
                    {_("Add option")}
                </Button> }
            </FormGroup>
        </Grid>
    );
}; 