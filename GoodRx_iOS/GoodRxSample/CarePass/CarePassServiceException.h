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
#import "CarePassClientException.h"

@interface CarePassServiceException : CarePassClientException {
    NSString            *requestId;
    NSString            *errorCode;
    NSString            *serviceName;
    NSInteger           statusCode;
    NSMutableDictionary *additionalFields;
}

#pragma mark Properties

/** The requestId as assigned by the service. */
@property (nonatomic, retain) NSString *requestId;

/** The error code returned by the service */
@property (nonatomic, retain) NSString *errorCode;

/**  */
@property (nonatomic, retain) NSString *serviceName;

/** The HTTP status code returned by the service */
@property (nonatomic) NSInteger statusCode;

/** Other fields in the error response from the service */
@property (nonatomic, readonly) NSMutableDictionary *additionalFields;

/** Initialize the exeption with a message.
 * @param message The message.
 * @return The exception.
 */
-(id)initWithMessage:(NSString *)message;

/** Return an exception with the given message
 *
 * @param theMessage The user-friendly message
 */
+(CarePassServiceException *)exceptionWithMessage:(NSString *)theMessage;

/** Return an exception with the given HTTP status code
 *
 * @param theStatusCode The HTTP status code.
 */
+(CarePassServiceException *)exceptionWithStatusCode:(int)theStatusCode;

/** Return an exception with the given message, error code, status, and request ID.
 *
 * @param theMessage The message for the exception.
 * @param theErrorCode The error code for the exception.
 * @param theStatusCode The HTTP Status code for the exception.
 * @param theRequestId The request ID assigned by the service.
 * @return The exception.
 */
+(CarePassServiceException *)exceptionWithMessage:(NSString *)theMessage
                                  withErrorCode:(NSString *)theErrorCode
                                 withStatusCode:(NSInteger)theStatusCode
                                  withRequestId:(NSString *)theRequestId;
-(void)setPropertiesWithException:(CarePassServiceException *)theException;
-(NSString *)description;



@end