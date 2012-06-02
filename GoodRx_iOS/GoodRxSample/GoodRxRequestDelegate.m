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

#import "GoodRxRequestDelegate.h"

@implementation GoodRxRequestDelegate

@synthesize response;
@synthesize error;
@synthesize exception;
@synthesize results;

-(id)init {
    self = [super init];
    if (self) {
        results = nil;
        response  = nil;
        exception = nil;
        error     = nil;
    }
    return self;
}

-(bool)isFinishedOrFailed {
    return (response != nil || error != nil || exception != nil);
}

-(void)request:(CarePassServiceRequest *)request didReceiveResponse:(NSURLResponse *)aResponse {
    NSLog(@"didReceiveResponse");
}

-(void)request:(CarePassServiceRequest *)request didCompleteWithResponse:(CarePassServiceResponse *)aResponse {
    NSLog(@"didCompleteWithResponse : %@", aResponse);
    response = aResponse;
    results.text = @"Bob";
}

-(void)request:(CarePassServiceRequest *)request didReceiveData:(NSData *)data {
    NSLog(@"didReceiveData");
}

-(void)request:(CarePassServiceRequest *)request didSendData:(NSInteger)bytesWritten totalBytesWritten:(NSInteger)totalBytesWritten totalBytesExpectedToWrite:(NSInteger)totalBytesExpectedToWrite {
    NSLog(@"didSendData");
}

-(void)request:(CarePassServiceRequest *)request didFailWithError:(NSError *)theError {
    NSLog(@"didFailWithError : %@", theError);
    error = theError;
}

-(void)request:(CarePassServiceRequest *)request didFailWithServiceException:(NSException *)theException {
    NSLog(@"didFailWithServiceException : %@", theException);
    exception = theException;
}

@end