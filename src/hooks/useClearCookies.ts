import Cookies from 'js-cookie';

export function useClearCookies() {
    // Removes cookies
    Cookies.remove('secondsLeft');
    Cookies.remove('gameCode');
    Cookies.remove('isHost');

}