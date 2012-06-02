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

@interface CarePassClientException : NSException {
    NSString *message;
    NSError  *error;
}

/** Description of the exception */
@property (nonatomic, retain) NSString *message;

/** The error that caused the exception. */
@property (nonatomic, retain) NSError *error;

/** Initialize the exception with a message.
 *
 * @param message The message.
 */
-(id)initWithMessage:(NSString *)message;

/** Return an exception with the given message
 *
 * @param theMessage The user-friendly message
 */
+(CarePassClientException *)exceptionWithMessage:(NSString *)theMessage;

/** Return an exception with the given message and error.
 *
 * @param theMessage The user-friendly message
 * @param theError The error
 */
+(CarePassClientException *)exceptionWithMessage:(NSString *)theMessage andError:(NSError *)theError;


@end
