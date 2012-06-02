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
#import <UIKit/UIKit.h>

#define CP_SDK_USER_AGENT_FORMAT    @"aws-sdk-iOS/%@ %@/%@ %@"
#define CP_SDK_VERSION              @"1.0.0"

@interface CarePassSDKUtil : NSObject

+(NSString *)userAgentString;
+(NSString *)urlEncode:(NSString *)input;

@end
