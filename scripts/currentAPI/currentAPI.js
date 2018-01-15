/*!
currentAPI.js

Created by Clément Brisset on 5/30/14.
Copyright 2014 High Fidelity, Inc.

Modified by David Rowe:
- ESLint.
- Ignore Qt functions.

Distributed under the Apache License, Version 2.0.
See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

(function () {

    "use strict";

    var array = [],
        buffer,
        i,
        length;

    function listKeys(string, object) {
        var keys,
            i,
            length;

        if (string === "listKeys" || string === "array" || string === "buffer" || string === "i") {
            return;
        }

        if (typeof(object) !== "object" || object === null) {
            array.push(string + " " + typeof(object));
            return;
        }

        keys = Object.keys(object);
        for (i = 0, length = keys.length; i < length; i++) {
            if (string === "") {
                listKeys(keys[i], object[keys[i]]);
            } else if (keys[i] !== "parent"
                    && ["destroyed", "objectName", "objectNameChanged"].indexOf(keys[i].split("(")[0]) === -1) { // Qt functions
                listKeys(string + "." + keys[i], object[keys[i]]);
            }
        }
    }

    listKeys("", this);
    array.sort();

    buffer = "\n======= JS API list =======";
    for (i = 0, length = array.length; i < length; i++) {
        buffer += "\n" + array[i];
    }
    buffer += "\n========= API END =========\n";

    print(buffer);

}());
