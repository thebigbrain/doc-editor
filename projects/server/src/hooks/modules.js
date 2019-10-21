exports.notfound = function (option) {
  return async (context) => {
    const {service, result, params} = context

    console.log(params, result)

    return context
  }
}
