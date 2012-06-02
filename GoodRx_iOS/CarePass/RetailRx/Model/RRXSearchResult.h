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

@interface RRXSearchResult : NSObject  {
    NSString *url;
    NSString *display;
    NSString *form;
    NSString *mobileUrl;
    NSMutableArray *brand;
    NSMutableArray *generic;
    NSString *dosage;
    NSString *quantity;
    NSMutableArray *price;
    NSString *manufacturer;
}

/** Gets and sets the lastModified property */
@property (nonatomic, retain) NSString *url;
@property (nonatomic, retain) NSString *display;
@property (nonatomic, retain) NSString *form;
@property (nonatomic, retain) NSString *mobileUrl;
@property (nonatomic, retain) NSMutableArray *brand;
@property (nonatomic, retain) NSMutableArray *generic;
@property (nonatomic, retain) NSString *dosage;
@property (nonatomic, retain) NSString *quantity;
@property (nonatomic, retain) NSMutableArray *price;
@property (nonatomic, retain) NSString *manufacturer;

@end