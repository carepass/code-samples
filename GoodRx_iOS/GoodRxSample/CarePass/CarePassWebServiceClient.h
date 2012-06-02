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
//#import "CarePassAuthUtils.h"
#import "CarePassClientException.h"
#import "CarePassServiceException.h"
//#import "CarePassSignatureException.h"
#import "CarePassServiceRequest.h"
#import "CarePassServiceRequestConfig.h"
#import "CarePassServiceResponse.h"
//#import "CarePassServiceResponseUnmarshaller.h"
#import "CarePassURLRequest.h"
#import "CarePassCredentials.h"
#import "CarePassRequestDelegate.h"

@interface CarePassWebServiceClient  : NSObject {
    CarePassCredentials *credentials;
    NSString          *endpoint;
    int               maxRetries;
    NSTimeInterval    timeout;
    NSTimeInterval    delay;
    NSString          *userAgent;
}

/** The service endpoint to which requests should be sent. */
@property (nonatomic, retain) NSString *endpoint;

/** The maximum number of retry attempts for failed retryable requests
 * (ex: 5xx error responses from a service).
 *
 * Default is 5.
 */
@property (nonatomic, assign) int maxRetries;

/** The amount of time to wait (in seconds) for data to be transfered over
 * an established, open connection before the connection times out and is closed.
 *
 * Default is 240 seconds.
 */
@property (nonatomic, assign) NSTimeInterval timeout;

/**
 * The amount of time to pause between retries.  The pause time will grow exponentially
 * for each retry on a single request.
 * Default is 0.05 seconds.
 */
@property (nonatomic, assign) NSTimeInterval delay;

/** The HTTP user agent header to send with all requests. */
@property (nonatomic, retain) NSString *userAgent;

/** Inits the client the given credentials. */
-(id)initWithCredentials:(CarePassCredentials *)theCredentials;

/** Constructs an empty response object of the appropriate type to match the given request
 * object.
 * @param request An instance of a subclass of CarePassServiceRequest.
 * @return An instance of the appropriate subclass of CarePassServiceResponse, or
 *         an instance of CarePassServiceResponse if there is no response class to
 *         match the instance passed in.
 */
+(CarePassServiceResponse *)constructResponseFromRequest:(CarePassServiceRequest *)request;

/** Utility method that sends the raw S3 Request to be processed.
 *
 * @param request An CarePassServiceRequest describing the parameters of a request.
 * @return The response from the service.
 */
-(CarePassServiceResponse *)invoke:(CarePassServiceRequest *)generatedRequest rawRequest:(CarePassServiceRequestConfig *)originalRequest unmarshallerDelegate:(Class)unmarshallerDelegate;

-(void)pauseExponentially:(int)tryCount;
-(bool)shouldRetry:(CarePassServiceResponse *)response;
-(bool)shouldRetry:(CarePassServiceResponse *)response exception:(NSException *)theException;

@end
