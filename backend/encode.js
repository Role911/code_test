module.exports = function encode(req, res) {
    const { string } = req.body

    // convert string to array
    let arr = string.split("");


    // interate over array and check elements
    // count the same element
    function encode(arr) {
        var  b = [], prev;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== prev) {
                b.push(arr[i], 1);
            } else {
                b[b.length - 1]++;
            }
            prev = arr[i];
        }
        return [b];
    }
    let result = encode(arr);

    //convert array to string
    let data = result[0].toString();

    // filter string
    let payload = data.replace(/[{(,)}]/g, '')

    return res.send({encode_string: payload})
}