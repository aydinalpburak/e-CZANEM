import axios from 'axios';

async function postRequestAdd(url,userid,productid){

    try {
        const postData = {
            userid: userid,
            productid: productid,
          };
        const response = await axios.post(url,postData);
        return response.data;

    } catch (error) {
        console.error(error);
        return null;
    };
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.text}>Response Data: {responseData ? responseData.results[0].name.first : "Loading..."}</Text>
    //   </View>
    // );
};

async function postRequestDelete(url,userid,productid){

    try {
        const postData = {
            userid: userid,
            productid: productid,
          };
        const response = await axios.post(url,postData);
        return response.data;

    } catch (error) {
        console.error(error);
        return null;
    };
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.text}>Response Data: {responseData ? responseData.results[0].name.first : "Loading..."}</Text>
    //   </View>
    // );
};

export {postRequestAdd as postRequest};

