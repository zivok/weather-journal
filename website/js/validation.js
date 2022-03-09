export default function isValidField(...fields) {
    return !fields.some(field => !field.validity.valid);
}