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
    NSString *accessKey;
    NSString *secretKey;
    NSString *securityToken;
}
/** Inits the credential with the access key and the secret key.
 *
 * @param apiKey The CP API Access Key
 */
-(id)initWithAPIKey:(NSString *)theAPIKey;

/** Inits the credential with the access key and the secret key.
 *
 * @param accessKey The CP Access Key
 * @param secretKey The CP Secret Key
 */
-(id)initWithAccessKey:(NSString *)accessKey withSecretKey:(NSString *)secretKey;

/** Inits the credential with the access key and the secret key.
 *
 * @param theAccessKey The CP Access Key
 * @param theSecretKey The CP Secret Key
 * @param theSecurityToken The CP Security Token
 */
-(id)initWithAccessKey:(NSString *)theAccessKey withSecretKey:(NSString *)theSecretKey withSecurityToken:(NSString *)theSecurityToken;


/** The CP API Access Key */
@property (nonatomic, retain) NSString *apiKey;

/** The CP Access Key */
@property (nonatomic, retain) NSString *accessKey;

/** The CP Secret Key */
@property (nonatomic, retain) NSString *secretKey;

/** The CP Security Token, used inconjunction with Session Based Credentials. */
@property (nonatomic, retain) NSString *securityToken;

@end
