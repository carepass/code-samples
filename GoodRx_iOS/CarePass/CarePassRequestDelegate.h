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

#import "CarePassServiceResponse.h"

@interface CarePassRequestDelegate : NSObject<CarePassServiceRequestDelegate> {
    @public
    CarePassServiceResponse *response;
    NSException           *exception;
    NSError               *error;
}

@property (nonatomic, readonly) CarePassServiceResponse *response;
@property (nonatomic, readonly) NSError               *error;
@property (nonatomic, readonly) NSException           *exception;


-(bool)isFinishedOrFailed;
-(void)request:(CarePassServiceRequest *)request didReceiveResponse:(NSURLResponse *)response;
-(void)request:(CarePassServiceRequest *)request didCompleteWithResponse:(CarePassServiceResponse *)response;
-(void)request:(CarePassServiceRequest *)request didReceiveData:(NSData *)data;
-(void)request:(CarePassServiceRequest *)request didSendData:(NSInteger)bytesWritten totalBytesWritten:(NSInteger)totalBytesWritten totalBytesExpectedToWrite:(NSInteger)totalBytesExpectedToWrite;
-(void)request:(CarePassServiceRequest *)request didFailWithError:(NSError *)error;
-(void)request:(CarePassServiceRequest *)request didFailWithServiceException:(NSException *)exception;

@end
