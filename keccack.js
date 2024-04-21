// Code by Fritz Kecac - License can be found under license.md or under https://www.gnu.org/licenses/gpl-3.0-standalone.html

function kecac_min(s) {
    function rotateLeft(x, n) {
        return (x << n) | (x >>> (32 - n));
    }

    const rounds = 24;
    let l, b, i, j, round, block;
    const s1 = unescape(encodeURIComponent(s));
    const r = [1, 0, 326, 0, 0, 163, 0, 258, 0, 0, 82, 0, 0, 9, 0, 0];
    let st = new Uint32Array(50), f = new Uint32Array(50);

    for (i = 0; s1[i] !== undefined; i++) {
        st[i >> 2] ^= s1.charCodeAt(i) << 8 * (i % 4);
    }
    st[i >> 2] ^= 0x80 << 8 * (i % 4);

    for (round = 0; round < rounds; round++) {
        for (i = 0; i < 25; i += 5) {
            for (j = 0; j < 5; j++) {
                b = st[i + j];
                l = st[i + (j + 1) % 5];
                f[j] = b ^ (~l & st[i + (j + 2) % 5]);
            }
            for (j = 0; j < 5; j++) {
                st[i + j] = rotateLeft(f[j], r[i + j]);
            }
        }
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 25; j += 5) {
                b = st[j + (i + 4) % 5];
                l = st[j + (i + 1) % 5];
                st[j + i] = b ^ l;
            }
        }
        b = st[1];
        for (i = 0; i < 24; i++) {
            j = i * 2 % 32;
            block = (i * 13 + 11) % 32;
            l = rotateLeft(b, block);
            b = st[j];
            st[j] = l;
        }
        st[0] ^= 1 << ((round + 1) % rounds);
    }

    let hex = '';
    for (i = 0, l = s1.length * 8; i < l; i += 8) {
        hex += (0xFF & st[i >> 5] >> (i % 32)).toString(16).padStart(2, '0');
    }
    return hex;
}

function generateSecureURL(option, username, password, goalDocument, baseUrl) {

    // Hash the username and password
    const hashedUsername = username ? kecac_min(username) : '';
    const hashedPassword = kecac_min(password);

    // Construct URL
    let url;
    switch (option) {
        case 'UPG':
            url = `${baseUrl}/${hashedUsername}/${hashedPassword}/${goalDocument}`;
            break;
		case 'PUG':
            url = `${baseUrl}/${hashedPassword}/${hashedUsername}/${goalDocument}`;
            break;
        case 'PG':
            url = `${baseUrl}/${hashedPassword}/${goalDocument}`;
            break;
        case 'UG':
            url = `${baseUrl}/${hashedUsername}/${goalDocument}`;
            break;
        case 'P':
            url = `${baseUrl}/${hashedPassword}`;
            break;
        case 'U':
            url = `${baseUrl}/${hashedUsername}`;
            break;
        default:
            console.error('Invalid option');
            return;
    }

    console.log('Generated URL:', url);
    return url;
}
