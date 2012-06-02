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

#import "../../CarePassServiceRequestConfig.h"

/**
 * Retail Rx Pricing Low Search Request
 *
 * \ingroup RRX
 */
@interface RRXSearchRequest : CarePassServiceRequestConfig {
    NSString *name;
    NSString *form;
    NSString *dosage;
    NSString *quantity;
    NSString *manufacturer;
    NSString *ndc;
}

/** Drug name to search for */
@property (nonatomic, retain) NSString *name;

/** Form is the physical form in which a drug is produced and dispensed, such as a tablet, a capsule, or an injectable */
@property (nonatomic, retain) NSString *form;

/** String representing the dosage measurement of the prescription medication */
@property (nonatomic, retain) NSString *dosage;

/** Float representing the quantity used to derive price */
@property (nonatomic, retain) NSString *quantity;

/** String referencing the manufacturer type of drug, either brand or generic */
@property (nonatomic, retain) NSString *manufacturer;

/** National Drug Code Directory identifier - will accept either 10-digit hyphenated or 11 digit non-hyphenated NDC */
@property (nonatomic, retain) NSString *ndc;

@end
