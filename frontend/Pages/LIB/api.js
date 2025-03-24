const BASE_URL = "https://vistotrack.com/api";

export function getApiUrl(endpoint) {
    return `${BASE_URL}${endpoint}`;
}

export function getCsrfToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)csrf_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
}
