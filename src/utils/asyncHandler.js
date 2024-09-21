const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };


// Alternative Way to Handle the Async Request
// const asyncHandler = (func) => async (req, res, next) => {
//     try {

//     } catch (error) {
//         console.error(`Error occured on asyncHandler : ${error}`);
//         res.status(500 | error.code).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
