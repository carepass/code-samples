/*
 * Copyright 2012 Aetna, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0.html
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

#import <Foundation/Foundation.h>
#import "CarePassSDKUtil.h"
#import "CarePassURLRequest.h"
#import "CarePassCredentials.h"
#import "CarePassClientException.h"

@protocol CarePassServiceRequestDelegate;
@class CarePassServiceResponse;
@class CarePassServiceException;

@interface CarePassServiceRequest : NSObject {
    CarePassURLRequest                 *urlRequest;
    NSMutableDictionary              *parameters;
    NSMutableDictionary              *headers;
    id<CarePassServiceRequestDelegate> delegate;
    NSString                         *httpMethod;
    NSString                         *endpoint;
    NSString                         *regionName;
    NSString                         *hostName;
    NSString                         *userAgent;
    NSString                         *jsonString;
    CarePassCredentials              *credentials;
    NSURLConnection                  *urlConnection;
    
    NSString                         *requestTag;
}

/** Request specific credentials. */
@property (nonatomic, retain) CarePassCredentials *credentials;

/** The urlRequest object which represents this request.
 * Use configureURLRequest to make sure all fields have
 */
@property (nonatomic, retain) CarePassURLRequest *urlRequest;

/** The connection object used to make the request.
 */
@property (nonatomic, retain) NSURLConnection *urlConnection;

/** The HTTP Method (GET, PUT, POST, DELETE) used for the request. */
@property (nonatomic, retain) NSString *httpMethod;

/** The URL for the resource.
 * This property is read-only.
 */
@property (nonatomic, readonly) NSURL             *url;

@property (nonatomic, retain) NSMutableDictionary *parameters;
@property (nonatomic, retain) NSMutableDictionary *headers;
@property (nonatomic, retain) NSString            *endpoint;
@property (nonatomic, retain) NSString            *hostName;
@property (nonatomic, retain) NSString            *userAgent;
@property (nonatomic, retain) NSString            *jsonString;

/**
 * Open property that enables user to distinquish various requests.
 */
@property (nonatomic, retain) NSString *requestTag;

-(CarePassURLRequest *)configureURLRequest;

-(NSString *)queryString;
-(void)sign;
-(void)assignHeaders;

-(void)setParameterValue:(NSString *)theValue forKey:(NSString *)theKey;

-(void)setHeaderValue:(NSString *)theValue forKey:(NSString *)theKey;

/** Returns the delegate object for the request */
-(id<CarePassServiceRequestDelegate> )delegate;

/** Sets the delegate object for the request.
 *
 * In the absence of a delegate, the client method that was called with the request will return the
 * response, occasionally processing inputs on the run loop which called the client method.
 *
 * If a delegate is assigned, the request proceeds asynchronously and will send the delegate messages
 * as the request progresses. The response will be sent to the delegate in the request:didCompleteWithResponse
 * delegate method.
 *
 * @param delegate An object which implements one or more of the methods in the CarePassServiceRequestDelegate protocol.
 *
 */
-(void)setDelegate:(id<CarePassServiceRequestDelegate> )delegate;

@end


/** The protocol for CarePassServiceRequest delegates.
 *
 * Delegate classes should implement one or more of these methods.
 *
 */
@protocol CarePassServiceRequestDelegate

@optional

/** Sent when the response header has been received, but before the body has been received.
 *
 * This method can be used to arrange resources for processing the body. The response is the
 * NSURLResponse object from the HTTP request, and not the complete response from the service.
 *
 * @param request The CarePassServiceRequest sending the message.
 * @param response The HTTP response information.
 */
-(void)request:(CarePassServiceRequest *)request didReceiveResponse:(NSURLResponse *)response;

/** Sent when body data has been read. May be called multiple times.
 *
 * The delegate should concatenate the contents of each data object delivered to build up the
 * complete data for the response.
 *
 * @param request The CarePassServiceRequest sending the message.
 * @param data    The newly available data.
 */
-(void)request:(CarePassServiceRequest *)request didReceiveData:(NSData *)data;


/** Sent when the entire response has been read and processed.
 *
 * This will be the most commonly used delegate method, containing the parsed response from the service
 * as the appropriate subclass of CarePassServiceResponse.
 *
 * This message does not necessarily indicate that the request was successful.
 * If the service responded with an error response, the <tt>exception</tt> property of the response will
 * be non-nil. This exception can be inspected for more information, or thrown to calling code.
 */
-(void)request:(CarePassServiceRequest *)request didCompleteWithResponse:(CarePassServiceResponse *)response;

/** Sent when the request transmitted data.
 *
 * On requests which are uploading non-trivial amounts of data, this method can be used to
 * get progress feedback.
 *
 * @param request                   The CarePassServiceRequest sending the message.
 * @param bytesWritten              The number of bytes written in the latest write.
 * @param totalBytesWritten         The total number of bytes written for this connection.
 * @param totalBytesExpectedToWrite The number of bytes the connection expects to write.
 */
-(void)request:(CarePassServiceRequest *)request didSendData:(NSInteger)bytesWritten
totalBytesWritten:(NSInteger)totalBytesWritten
totalBytesExpectedToWrite:(NSInteger)totalBytesExpectedToWrite;

/** Sent when there was a basic failure with the underlying connection.
 *
 * Receiving this message indicates that the request failed to complete.
 *
 * @param request The CarePassServiceRequest sending the message.
 * @param error   An error object containing details of why the connection failed to load the request successfully.
 */
-(void)request:(CarePassServiceRequest *)request didFailWithError:(NSError *)error;

/** Sent when the service responded with an exception.
 *
 * @param request   The CarePassServiceRequest sending the message.
 * @param exception The CarePassClientException that would have been thrown in the absence of a delegate.
 */
-(void)request:(CarePassServiceRequest *)request didFailWithServiceException:(NSException *)exception;

@end
