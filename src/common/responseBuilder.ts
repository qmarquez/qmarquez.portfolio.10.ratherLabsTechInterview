function responseBuilder(data: any, message = 'Success', status = 200) {
  return {
    data,
    message,
    status,
  };
}

export default responseBuilder;
