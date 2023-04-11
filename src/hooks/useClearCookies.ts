import Cookies from 'js-cookie';

// clears the cookies from the game's browser
export function useClearCookies() {
    // Removes cookies
    Cookies.remove('secondsLeft');
    Cookies.remove('gameCode');
    Cookies.remove('isHost');
    Cookies.remove('index');
    Cookies.remove('name');
}