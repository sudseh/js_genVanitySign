/*
Python code to port:
#!/usr/bin/python3
'''
General-class callsign generator (1x3 and 2x3)

Here is the list of callsigns we will NOT generate:
     1.  KA2AA-KA9ZZ, KC4AAA-KC4AAF, KC4USA-KC4USZ, KG4AA-KG4ZZ,
          KC6AA-KC6ZZ, KL9KAA- KL9KHZ, KX6AA-KX6ZZ;
        regex:
        [kK][aA][2-9][a-zA-Z]{2}\b|[kK][cC]4[aA][aA][a-fA-F]\b|[kK][cC]4[uU][sS][a-zA-Z]\b|[kK][gG]4[a-zA-Z]{2}\b|[kK][cC]6[a-zA-Z]{2}\b|[kK][lL]9[kK][a-hA-H][a-zA-Z]\b|[kK][xX]6[a-zA-Z]{2}\b

     2.  Any call sign having the letters SOS or QRA-QUZ as the suffix;
        regex:
        \d[sS][oO][sS]|\d[qQ][r-uR-U][a-zA-Z]

     3.  Any call sign having the letters AM-AZ as the prefix (these prefixes
          are assigned to other countries by the ITU);
        regex:
        [aA][m-zM-Z]\d

     4.  Any 2-by-3 format call sign having the letter X as the first letter of the suffix;
        regex:
        [a-zA-Z]{2}\d[xX][a-zA-Z]{2}

     5.  Any 2-by-3 format call sign having the letters AF, KF, NF, or WF as the prefix
          and the letters EMA as the suffix (U.S Government FEMA stations);
        regex:
        [aAkKnNwW][fF]\d[eE][mM][aA]

     6.  Any 2-by-3 format call sign having the letters AA-AL as the prefix;
        regex:
        [aA][a-lA-L]\d[a-zA-Z]{3}

     7.  Any 2-by-3 format call sign having the letters NA-NZ as the prefix;
        regex:
        [nN][a-zA-Z]\d[a-zA-Z]{3}

     8.  Any 2-by-3 format call sign having the letters WC, WK, WM, WR, or WT
          as the prefix (Group X call signs);
        regex:
        [wW][cCkKmMrRtT]\d[a-zA-Z]{3}

     9.  Any 2-by-3 format call sign having the letters KP, NP or WP as the prefix
          and the numeral 0, 6, 7, 8 or 9;

    10.  Any 2-by-2 format call sign having the letters KP, NP or WP as the prefix
          and the numeral 0, 6, 7, 8 or 9;

        regex:
        [kKnNwW][pP][06789](?:[a-zA-Z]){2,3}

# function to perform the callsign comparo
def available_callsigns(callsigns):
    existingCallsignsFormatted = []
    # first read in and format callsigns.txt
    try:
        fp = open('./callsigns.txt')
        line = fp.readline()
        while line:
            existingCallsignsFormatted.append((line[7:]).rstrip())
            line = fp.readline()
    finally:
        fp.close()

    # then return our list using our generated callsigns minus the existing ones and return
    return list(set(callsigns) - set(existingCallsignsFormatted))


# if this script is called directly, run me!
if __name__ == '__main__':
    url = sanitizeInput(sys.argv)
    get_list(url)
    vanityCall = generate_callsigns()
    print(sorted(available_callsigns(vanityCall), key=str.lower))


*/

/*
* function to generate the callsigns removing the invalid ones
* def generate_callsigns():
* first generate over 8000 matches
* then remove the invalid callsigns
* finally return the list of valid vanity callsigns
*/
const callsignsGenerated = () => {
    const invalidCallsignRegex = [/[kK][aA][2-9][a-zA-Z]{2}/,
                            /[kK][cC]4[aA][aA][a-fA-F]/, 
                            /[kK][cC]4[uU][sS][a-zA-Z]/, 
                            /[kK][gG]4[a-zA-Z]{2}/, 
                            /[kK][cC]6[a-zA-Z]{2}/, 
                            /[kK][lL]9[kK][a-hA-H][a-zA-Z]/, 
                            /[kK][xX]6[a-zA-Z]{2}/, 
                            /\d[sS][oO][sS]|\d[qQ][r-uR-U][a-zA-Z]/, 
                            /[aA][m-zM-Z]\d/, 
                            /[a-zA-Z]{2}\d[xX][a-zA-Z]{2}/, 
                            /[aAkKnNwW][fF]\d[eE][mM][aA]/, 
                            /[aA][a-lA-L]\d[a-zA-Z]{3}/, 
                            /[nN][a-zA-Z]\d[a-zA-Z]{3}/, 
                            /[wW][cCkKmMrRtT]\d[a-zA-Z]{3}/,
                            /[kKnNwW][pP][06789](?:[a-zA-Z]){2,3}/]


    const randexp = require('randexp').randexp;
    let callsignArray = [];
    while (callsignArray.length < 100) {
        // generate the callsign
        const callsign = randexp(/[AKNWaknw][a-zA-Z]{0,1}[0123456789][a-zA-Z]{3}/).toUpperCase();
        // only enter each callsign once
        let pushed = false;
        // make sure it's valid
        invalidCallsignRegex.forEach((invalid) => {
                if (callsign.match(invalid)) {
                    null;
                } else {
                    if (pushed) {
                        null;
                    } else {
                        callsignArray.push(callsign);
                        pushed = true;
                    }
                }
        });
    }
    return callsignArray;
};




// helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Buttons
const genBtn = document.getElementById('genBtn');
genBtn.onclick = e => {
  genBtn.innerText = 'Generating';
  sleep(1000).then(() => {genBtn.innerText = 'Generate' });
  document.getElementById("generated").innerHTML=callsignsGenerated().join(' ');
};
