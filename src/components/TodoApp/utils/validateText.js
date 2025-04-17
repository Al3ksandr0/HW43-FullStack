export function validateText(input) {
    const trimmed = input.trim();
    return trimmed === "" ? null : trimmed;
}
