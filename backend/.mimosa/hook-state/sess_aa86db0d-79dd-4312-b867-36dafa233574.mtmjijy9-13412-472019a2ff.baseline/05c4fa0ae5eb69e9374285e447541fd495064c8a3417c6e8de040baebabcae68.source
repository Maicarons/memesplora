package s3

import "net/http"

type S3Error struct {
	XMLName    struct{} `xml:"Error"`
	Code       string   `xml:"Code"`
	Message    string   `xml:"Message"`
	Resource   string   `xml:"Resource,omitempty"`
	RequestID  string   `xml:"RequestId,omitempty"`
	HTTPStatus int      `xml:"-"`
}

var (
	ErrNotImplemented = S3Error{
		Code: "NotImplemented", Message: "This operation is not implemented yet",
		HTTPStatus: http.StatusNotImplemented,
	}
	ErrNoSuchBucket = S3Error{
		Code: "NoSuchBucket", Message: "The specified bucket does not exist",
		HTTPStatus: http.StatusNotFound,
	}
	ErrNoSuchKey = S3Error{
		Code: "NoSuchKey", Message: "The specified key does not exist",
		HTTPStatus: http.StatusNotFound,
	}
	ErrInvalidRequest = S3Error{
		Code: "InvalidRequest", Message: "Invalid request",
		HTTPStatus: http.StatusBadRequest,
	}
	ErrInternalError = S3Error{
		Code: "InternalError", Message: "Internal server error",
		HTTPStatus: http.StatusInternalServerError,
	}
	ErrBucketAlreadyExists = S3Error{
		Code: "BucketAlreadyExists", Message: "The requested bucket name already exists",
		HTTPStatus: http.StatusConflict,
	}
)