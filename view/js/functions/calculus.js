function truncate_decimals(num, fixed = 2) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
   const truncated_number =  num.toString().match(re)[0];

    return parseFloat(truncated_number);
}

function process_number_format (num) {
    var processed_number = (truncate_decimals(num).toFixed(2)).toString();
    processed_number = processed_number.replace(".",",");

    const char_array = Array.from(processed_number).reverse(); 
    var final_char_array = char_array;

    const array_length = char_array.length;
    for (let i = 6; i < array_length; i = i+4) {
        final_char_array.splice(i,0,".");
    }

    return (final_char_array.reverse()).join("");
}

export { truncate_decimals , process_number_format }