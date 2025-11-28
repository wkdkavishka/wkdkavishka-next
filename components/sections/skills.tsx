"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

import siteData from "@/data/site-data";

export function Skills() {
  return (
    <section id="skills" className="container mx-auto py-24 sm:py-32 px-4 md:px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 text-center md:gap-8 mb-16"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills & Technologies</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {siteData.personal.skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="border-muted-foreground/20 hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex items-center justify-center">
                <span className="font-medium">{skill}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
