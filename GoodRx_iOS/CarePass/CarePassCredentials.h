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

@interface CarePassCredentials : NSObject {
    NSString *apiKey;
    NSString *clientId;
    NSString *accessToken;
}
/** Inits the credential with the access key and the secret key.
 *
 * @param apiKey The CP API Access Key
 */
-(id)initWithAPIKey:(NSString *)theAPIKey;

/** Inits the credential with the api key, the access key and the secret key.
 *
 * @param apiKey The CP API Access Key
 * @param accessToken The CP Sync Access Token
 */
-(id)initWithAPIKey:(NSString *)theAPIKey withClientId:(NSString *)theClientId withAccessToken:(NSString *)theAccessToken;

/** The CP API Access Key */
@property (nonatomic, retain) NSString *apiKey;

/** The CP Client Id */
@property (nonatomic, retain) NSString *clientId;

/** The CP Access Token */
@property (nonatomic, retain) NSString *accessToken;

@end
